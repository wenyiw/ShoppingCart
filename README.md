# Shopping Cart

The project now consists of a shopping cart page and an address page.
Although written with vue, the current version, as the branch name implied, did not use components or use .vue files to combine html, css, and js parts together.

Cart:
-----
* Changing Quantity
    * Total price of THAT item will change accordingly
    * If the item is checked, total price will change accordingly
* Selection
    * Anytime any item is checked/unchecked, total price will change accordingly
    * If all are checked, the 'Select All' option will automatically be checked; on the other hand, if not all are checked, the option will be unchecked
* Deletion:
    * Clicking the delete icon will pop up a window asking for confirmation
    * If clicking Yes and the item is checked, total price will change accordingly

Address:
-----
* Appearance
    * By default only show 3 addresses
    * By clicking the more button we can toggle between showing 3 and showing all addresses
* Updating
    * Can select any address to be default
    * Can delete any address (same process as deleting an item in the cart)
    * Can add a new address (will be automatically shown as the first address and set to default)

TODO:
---
* Jumping
    * Only if at least 1 item is checked we can jump to address page from shopping cart page by clicking Make Payment
* Editing Address
    * By clicking the edit button a window (same format as the adding new address) will pop up with rows filled with the existing info
* Implementing More Pages
    * View Order
    * Make Payment
    * Order Confirmation
* Transferring to Real Vue Projects
    * Implement another version with components and .vue files

    
