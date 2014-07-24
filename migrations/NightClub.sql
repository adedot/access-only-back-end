CREATE TABLE Places
(
   id            SERIAL,
   "name"        VARCHAR(255),
   address       VARCHAR(255),
   city          VARCHAR(255),
   state         VARCHAR(255),
   "createdAt"   DATE,
   "updatedAt"   DATE
)

Create Table Products
(
   id            SERIAL,
   "name"       VARCHAR(255),
   sku      	VARCHAR(25),
   type         VARCHAR(20),
   brand        VARCHAR(50),
   price
   is_active
   quantity	INT,
   description 	VARCHAR(50),
   "createdAt"   DATE,
   "updatedAt"   DATE
)

Create Table Order
(
 "createdAt"   DATE,
   "updatedAt"   DATE
)

Create Table User
(
	id            SERIAL,
  	"firstname"       VARCHAR(255),
	"lastname"       VARCHAR(255),
	"email"       VARCHAR(255),
	"phone"       VARCHAR(14),
 	"createdAt"   DATE,
   	"updatedAt"   DATE

)

Create Table Guestlist
(
 "createdAt"   DATE,
   "updatedAt"   DATE
)
