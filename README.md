BEFORE RUNNING:

-ensure docker is running

-open a terminal

-cd into /api
    -npm install

-cd into /ui
    -npm install

-cd back to root directory with docker-compose.yaml
    -docker-compose up --build

-you should now be able to access the app on http://localhost:3000/


USE INSTRUCTIONS:

-start from http://localhost:3000/

-continuing as guest allows you to view the entire inventory, but not create any items

-create an account allows you to make a new account which updates the database with your information

-upon logging in, you are directed to your personal inventory where you can create/delete/view the items that you own which updates the database

-you can view the entire inventory by clicking "All Inventory", which contains all items, those from other users as well as your own
    -you cannot edit while viewing items on this page

-clicking the "Sign out" button sends you back to the login page where you can login or make a new account


KNOWN ISSUES:

-You must always start from http://localhost:3000/
    -going to specific endpoints without logging in or continuing as guest will break the api


User Stories
1. As an inventory manager I want to be able to create an account so that I can track my inventory. - COMPLETE

2. As an inventory manager I want to be able to log into my account so that I can see my inventory of items. - COMPLETE
    -After logging in, the inventory manager should be redirected to their inventory of items. - COMPLETE
   
3. As an inventory manager I want to be able to create a new item so that I can share my item details with the world. - COMPLETE
    -After the item is created, the inventory manager should be redirected to their inventory of items. -COMPLETE
    -An item displays name, description, and quantity. - COMPLETE
    
4. As an inventory manager I want to be able to see a my entire inventory of items. - COMPLETE
    -The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters. - COMPLETE

5. As an inventory manager I want to be able to see any individual item I have added. - COMPLETE
    -The full item information should be displayed. - COMPLETE

6. As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it. - COMPLETE
    -When the user toggles edit mode, the page remains the same and the fields become editable. - UNFINISHED

7. As an inventory manager I want to be able to delete an item so that I can remove any unwanted content. - COMPLETE
    -When the user deletes the item they should be redirected to their inventory of items. - COMPLETE

8. As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item. - COMPLETE
    -Unauthenticated users should be able to view all items, and any single item. - COMPLETE
    -The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters. - COMPLETE

9. As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details. - COMPLETE
    -Unauthenticated users should be able to view all items, and any single item. - COMPLETE

10. As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item. - COMPLETE
    -Unauthenticated users should be able to view all items, and any single item. - COMPLETE