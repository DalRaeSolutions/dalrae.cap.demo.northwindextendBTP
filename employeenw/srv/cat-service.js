const cds = require('@sap/cds');


module.exports = cds.service.impl(async function() {
  const service = await cds.connect.to('NorthWind');
  const { Employees } = this.entities;
 
  this.on('READ', Employees, async req => {

    let EmployeeQuery = SELECT.from(req.query.SELECT.from)
    .limit(req.query.SELECT.limit)

if (req.query.SELECT.where) {
  EmployeeQuery.where(req.query.SELECT.where)
}
if (req.query.SELECT.orderBy) {
  EmployeeQuery.orderBy(req.query.SELECT.orderBy)
}

let results = await service.tx(req).send({
    query: EmployeeQuery,
})

    let employees = []
  if (Array.isArray(results)){
    employees = results
  }else {employees[0] = results }
  
  const getExtensionData = employees.map(async (item) => {
    const data = await SELECT.from('EmployeesAtr').where({ EmployeeID_EmployeeID: item.EmployeeID })
    if (data[0]) {
        item.MiddleName  = data[0].MiddleName
        item.PhoneNumber = data[0].PhoneNumber
    } else {
        item.MiddleName  = null
        item.PhoneNumber = null
    }
   
    return item
    
})
const employeesWithExtension = await Promise.all(getExtensionData)
//console.log(employeesWithExtension)
  return employeesWithExtension

  })
});