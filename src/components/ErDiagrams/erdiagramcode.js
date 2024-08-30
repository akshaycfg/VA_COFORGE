export default `
erDiagram
DEMODB_EMPLOYEES { DEPARTMENT VARCHAR LASTNAME VARCHAR FIRSTNAME VARCHAR EMPLOYEEID NUMERIC PK DEPARTMENT VARCHAR LASTNAME VARCHAR FIRSTNAME VARCHAR EMPLOYEEID NUMERIC }
DEMODB_ORDERS { TOTALAMOUNT NUMERIC EMPLOYEEID NUMERIC ORDERDATE DATE ORDERID NUMERIC PK EMPLOYEEID NUMERIC FK }
DEMODB_PAYMENTS { ORDERID NUMERIC EMPLOYEEID NUMERIC PAYMENTDATE DATE PAYMENTID NUMERIC PK EMPLOYEEID NUMERIC FK ORDERID NUMERIC FK }
DEMODB_HIM_MARKS10 { DATETM TIMESTAMP(6) MARK NUMERIC MODULE_CODE VARCHAR STUDENT_NO VARCHAR }
DEMODB_TEST_MAS_EMP { COUNTRY VARCHAR CREATDT TIMESTAMP(6) STATUS VARCHAR EMPNAME VARCHAR EMPID NUMERIC }
DEMODB_MAS_CON_2 { AGE NUMERIC EMPNAME VARCHAR }
DEMODB_MAS_CON_3 { AGE NUMERIC EMPNAME VARCHAR }
DEMODB_MAS_CON_5 { AGE NUMERIC EMPNAME VARCHAR }
DEMODB_IMAGE { TIMEWITHTIMEZONE_1 VARCHAR TIMEWITHTIMEZONE VARCHAR NUMERICTYPE NUMERIC INTTYPE NUMERIC CHARTYPE CHAR CURRENTTIME TIMESTAMP(6) CURRENTDT DATE CBODY TEXT BODY_1 BYTEA BODY BYTEA SUBJECT VARCHAR ID NUMERIC PK TIMEWITHTIMEZONE_1 VARCHAR TIMEWITHTIMEZONE VARCHAR NUMERICTYPE NUMERIC INTTYPE NUMERIC CHARTYPE CHAR CURRENTTIME TIMESTAMP(6) CURRENTDT DATE CBODY TEXT BODY_1 BYTEA BODY BYTEA SUBJECT VARCHAR ID NUMERIC }
DEMODB_MEMBERS { DEPARTMENT VARCHAR LASTNAME VARCHAR FIRSTNAME VARCHAR PK EMPLOYEEID NUMERIC PK DEPARTMENT VARCHAR LASTNAME VARCHAR FIRSTNAME VARCHAR EMPLOYEEID NUMERIC }
DEMODB_ORDERS ||--|{DEMODB_EMPLOYEES : EMPLOYEEID
DEMODB_PAYMENTS ||--|{DEMODB_EMPLOYEES : EMPLOYEEID
DEMODB_PAYMENTS ||--|{DEMODB_ORDERS : ORDERID

    
    `;
