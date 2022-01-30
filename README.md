
# Vino Test Instructions


## Assumptions

* Holidays are not included in workdays.
* All date times and business hours are calculated based on UTC.  Further work would be needed to allow stores in different time zones.
* A birthday has occurred when you have passed the previous year's date, but is based on the timezone you are currently in.

## Getting started


To get started, run the following commands.

  
```
npm install
npm start
```

  

This will start the development server at `http://localhost:3000`

  

## Endpoints


The following endpoints are available:

| Route  | Method  |  Query Params |
|---|---|---|
| `http://localhost:3000/age_validator`  |  `GET` |  dob`<string>` |
|  `http://localhost:3000/business_hours` | `GET`  | start`<string>`, end`<string>`  |

Note that while ISO 8601 is the preferred date format for all the above query params, any parseable date string can be calculated.

E.g., `http://localhost:3000/age_validator?dob=07-04-1986`

  

## Tests

  

To run tests:

  

```

npm test

```