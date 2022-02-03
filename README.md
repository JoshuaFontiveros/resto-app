
# Restaurant App
This app is a simple restaurant app made using JavaScript.
The features of this app are the following:
* It allows you to add new product
* Edit your current product
* Delete product. 
* Add product in your cart
* Increase quantity in your cart
* Delete product in your cart.
I have also added a lot of validations in this app. For example:

* You can't add the same product name regardless if it's uppercase or lowercase.
* If product was deleted, it should also be deleted in your cart.
* If you click edit button and then click the update button without changing anything, it will alert you that you didn't changed anything.
* If you try to edit a product that is already in cart and you clicked save without changing anything, it will alert you that you didn't changed anything. Please try again.
* If you try to edit a product that is already in cart and you did some changes and clicked save, it will be deleted in your cart and the product will be updated.

## Tech Stack

**Client:** React, Redux, React-Bootstrap

**Server:** N/A

## Run Locally

Clone the project

```bash
  git clone https://github.com/JoshuaFontiveros/resto-app.git
```

Go to the project directory

```bash
  cd resto-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Roadmap

- Additional browser support

- Add more integrations

