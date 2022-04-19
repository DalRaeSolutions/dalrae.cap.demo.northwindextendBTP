namespace dalrae.cap.demo.extend;

//using { managed } from '@sap/cds/common';
// using dalrae.cap.demo.extend as extend from 'Empl-Atr/db/schema';

using { NorthWind as external } from '../srv/external/NorthWind.csn';
 
  entity EmployeesAtr {
    key EmployeeID  : Association to one external.Employees;
        MiddleName  : String; 
        PhoneNumber : String; 
  }