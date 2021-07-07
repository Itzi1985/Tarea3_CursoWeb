const puppeteer = require('puppeteer');
const chai = require('chai');
const { assert } = require('chai');

describe('Prueba carrito de compras', async () => {

    it('Prueba', async () =>  {
        const browser = await puppeteer.launch({headless: false, slowMo: 500 })
        const page = await browser.newPage();
        await page.goto('http://automationpractice.com/index.php')
    //Se genera numero aleatorio entre 1 a 7 para seleccionar alguno de los elementos de la tabla   
        let value = Math.floor(Math.random() * 7);
    //Se da clic al boton "Add to cart" del elemento 
        await page.click("a[data-id-product='" + value + "']");
        page.waitForTimeout(5000);
    //Se obtiene el monto del elemento a agregar al carrrito
        const amount =  await page.$eval("#layer_cart_product_price", element => element.innerText);
    //Se da clic al boton para ir al carrito de compras
        await page.click("a[title='Proceed to checkout'] > span");
        page.waitForTimeout(5000);
    //Obtenemos el precio de la pagina del carrito de compras
        const cartAmount = await page.$eval('.price > .price', element => element.innerText);
    //Comparamos que el precio obtenido de la primer pagina del producto agregado al carrito, corresponda al monto en el carrito
        console.log("Monto en pagina principal: " + amount + " Y monto en carrito: " + cartAmount); 
        assert.equal(amount, cartAmount , "Monto en pagina principal: " + amount + "Y monto en carrito: " + cartAmount);
        await browser.close();
    })   

})
