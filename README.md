# Overview

Create a backend user authenticated REST API with endpoints that can service a frontend UI. A role middleware must be used to ensure the authenticated user has the required permissions denoted in the role permissions in order to utilize each endpoint.

## Requirements
The web server must only be used for compute and cannot be used for sessions, user uploaded assets or otherwise, i.e. the web server must be replaceable at any time.

The stack, its resources and user-uploaded assets cannot be accessible directly to the
public or any resource not located within the stack, except as specifically required by the
functional requirements.

As a logged in user who is Active and has the appropriate permissions, I can:
 
Add, view, edit, and delete maintenance records

Fields:
* denotes required fields

 “* Unit” (Dropdown; separate record in database, only pulls from Active, sorted by Position Asc)

```
Sample options below:
“Select a Unit” (Default; placeholder)
“A1”
“A2”
“A3”
```

“* Completed On” (Date/Time)

“* Maintenance Type” (Dropdown; separate record in database, only pulls from Active, sorted by Position Asc)

```
Sample options below:
“Oil Change” (Default)
“Scheduled”
“Custom” (Hard-coded)
```

“* Custom Type” (Text field that only appears and is required if “Custom” is selected from “Maintenance Type”)

“* Next Due” (Date/Time)

“* System Engine Hours” (Read-only; number with 2 decimal places; pulls from the selected Unit record)

“Actual Engine Hours” (Text Field; number with 2 decimal places)

“Engine Hours Next Due” (Text Field; number with 2 decimal places)

“Pictures” (Upload up to 5 pictures with a captain and ability to remove when editing)

“Notes” (Textarea; separate record in database; cannot be edited or deleted after adding but I can add multiple notes and they display with timestamp and logged-in user who created)

“Conducted By” (Read-only; currently logged-in user’s name for display, stored as user’s ID)

List and search for maintenance records by any of the fields on the add/edit screens.

ROLE PERMISSIONS

• maintenance_records_add

• maintenance_records_update

• maintenance_records_delete

• maintenance_records_view

• maintenance_records_list

• maintenance_records_search

## Getting Started

Create a .env file in the root directory and add the following key/value pair

``` 
DB_CONNECTION="[mongo connection string]" 
DB_NAME="[mongo database name]" 
PORT="[port]"
```

Mongo is required to operate this solution. 

## Start Server
Open terminal and navigate to the root dir and run:
```
node server.js
```