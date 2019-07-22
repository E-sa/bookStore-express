# bookStore-express


install:


    inside express folder:
		
		
        npm install
        npm install mongoose
        npm install --save bcrypt-nodejs    
        npm install cors
        npm install helmet
        npm install jsonwebtoken
        npm install config 



database:



    'Library' database, 
    includes the collections:
        books       
        users
        buy



# instruction:
# authentication related routes:


return list of users					


  	GET:        localhost:3000/api/v1/auth 
		
								

to register a new user


		Post:       http://localhost:3000/api/v1/auth
		
            send username, email, password  
            example:
            
                {
                    "username": "alice",
                    "email":"wonderland@yahoo.com",
                    "password": "012"
                }  
                
                
            notice: 
                email is unique, you cant have the email that already exists in database   
								
								
login


		POST:       http://localhost:3000/api/v1/auth/login
            send email and password you have registered with.
						
            example:
            {
                "email": "wonderland@yahoo.com",
                "password": "012"
            } 
						
            copy your authentication data and in postman header add it with 'auth' as the key.
            now you are successfully logged in. if you want to make sure please do a PUT request to:
						http://localhost:3000/api/v1/auth/welcome and see if its welcomes you.
						
						
            notice:
            1. you cant sign in with invalid username and password


 delete any user in database


		DELETE:     http://localhost:3000/api/v1/auth/:id
           




# book related routes:

see all the books in database


		GET:        http://localhost:3000/api/v1/book
            see all the books in database
            list of books are paginated, first page shows only the first five books to see the other pages:(starting with page=0)
            http://localhost:3000/api/v1/book/?page=1


if you know the id of a specific book 


		GET:        http://localhost:3000/api/v1/book/:id
            

            
add a new book


		POST:      http://localhost:3000/api/v1/book/          
             example:
            {
                "title": "alice in wonderland",
                "author": "lewis carroll",
                "price": "2.99",
                "quantity": "21",
                "users": [],
                "description": "anything you want"
            }
            later on if anyone rent this book, his/her email will be shown in users.
            later on if anyone bought the book quantity will change
            you cant have two books with the same title


incase you want to update a book that you know the id


		PUT:        http://localhost:3000/api/v1/book/:id     
		
		
delete any book in database with its id


		DELETE:     http://localhost:3000/api/v1/book/:id
            



# buy related routes:

to buy a book


		POST:       http://localhost:3000/api/v1/buy/purchase
            send the title of the book and the amount you want to buy.
            example:
                   {
                        "title": "alice in wonderland",
                        "quantity": "2"
                   }

            notice:
            you will get notice if the quantity you want is more than what is in database.
            the book and your email will be saved in 'buy' collection, so you need to sign in before purchase.
						

to rent the book


	POST:       http://localhost:3000/api/v1/buy/rent
	just send the title of the book you want to rent
	example:
				{
						"title":"alice in wonderland"
				}
		











        
    
