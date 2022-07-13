
//get form data
const shop_modal        = document.querySelector('#shop_modal');
const msg               = document.querySelector('.msg');
const product_list      = document.querySelector('#product_list');
const productView       = document.querySelector('#productView');
const edit_modal_form   = document.querySelector('#edit_modal_form');




//All product Data loop

const allProductData = () => {
    
    //get localStore
    const data = readLsData('product');

     //have item
  let itemData = '';

  if (data) {
    let total = 0;
    data.map((item, index) => {
      total += item.price * item.quantity;
      itemData += ` <tr>
                    <td>${index + 1}</td>
                    <td>
                      <img style=" width: 60px; height: 60px; object-fit: cover; border-radius: 4px; "
                        src="${item.photo}" alt=""
                      />
                    </td>
                    <td>${item.name}</td>
                    <td>${item.price} BDT</td>
                    <td>${item.quantity}</td>
                    <td>${item.price * item.quantity} BDT</td>
                    <td>
                      <a data-bs-toggle="modal" show-product="${index}" class="btn btn-info btn-sm" href="#show_modal"><i class="fas fa-eye"></i></a>
                      <a data-bs-toggle="modal" edit-product="${index}" class="btn btn-warning btn-sm" href="#edit_modal"><i class="fas fa-edit"></i></a>
                      <a remove_product="${index}" class="btn btn-danger btn-sm" href="#"><i class="fas fa-trash"></i></a>
                    </td>
                  </tr>`;
    });
        
        if (total != 0) {
          itemData += `<tr>
                        <td colspan="6" class="text-end">Total Price: ${total} BDT</td>
                    </tr>`;
        } else {
          itemData = `<tr>
                        <td colspan="7" class="text-center">No product found</td>
                    </tr>`;


        }
    
    
  } 
   
    product_list.innerHTML = itemData;
}

allProductData();


// product Show item
product_list.onclick = (e) => {
  e.preventDefault();
  //show product
  if (e.target.hasAttributes('show-product')) {
    const index = e.target.getAttribute('show-product');
    const data = readLsData('product');
    const showPd = data[index];
    productView.innerHTML = `<div class="card">
              <img class="card-img-top" src="${showPd?.photo}" alt="${showPd?.name}" />
              <div class="card-body">
                <h5 class="card-title">Product Name: ${showPd?.name}</h5>
                <p class="card-text">Product Price : ${showPd?.price} BDT</p>
              </div>
            </div>`;
  }

  //Edit and modify product
  if (e.target.hasAttributes('edit-product')) { 
    const index     = e.target.getAttribute('edit-product');
    const data      = readLsData('product');
    const editItem  = data[index];
    edit_modal_form.innerHTML = `
        <div class="my-3">
                <label for="">Name</label>
                <input name="name" type="text" value="${editItem?.name}" class="form-control" />
              </div>
              <div class="my-3">
                <label for="">Price</label>
                <input name="price" type="text" value="${editItem?.price}" class="form-control" />
              </div>
              <div class="my-3">
                <label for="">Quantity</label>
                <input name="quantity" type="text" value="${editItem?.quantity}" class="form-control" />
                <input name="index" type="hidden" value="${index}" class="form-control" />
              </div>
              <div class="my-3">
                <label for="">Photo</label>
                <div>
                   <img class="img-fluid" style=" max-height: 300px; object-fit: cover; border-radius: 4px; margin: auto; display: block; "
                        src="${editItem?.photo}" alt=""
                      />
                </div>
              </div>
              <div class="my-3">
                <input name="photo" type="text" value="${editItem?.photo}" class="form-control" />
              </div>
              <div class="my-3">
                <input
                  type="submit"
                  class="btn btn-primary w-100"
                  value="update now"/>
              </div>
    `
  }


  //remove product
  if (e.target.hasAttributes('remove_product')) {
    const getIndex      = e.target.getAttribute('remove_product');
    const data        = readLsData('product');
    

    let removeItem = [];

    data.map((item, index) => { 

      if (index == getIndex) {
        e.target.parentElement.parentElement.remove();
      } else { 
        removeItem.push(item);
      }
      
    });

    upLsData('product', removeItem);
    allProductData();
  }


  
}




// on submit product form
shop_modal.onsubmit = (e) => {
    //form reload false
    e.preventDefault();

    // get the form form data
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());
    const {name,price,quantity,photo} = Object.fromEntries(formData.entries());

    //form input field condition

    if (!name || !price || !quantity || !photo) {
        msg.innerHTML = setAlert('All Field is required!');
    } else if (numberCheck(quantity) == false) {
        msg.innerHTML = setAlert('Must be validated Number!','warning');
    } else {
        
        // passing local store data
        setLsData('product', productData);
        // sent the success msg
        msg.innerHTML = setAlert('Data stable !', 'success');
        //form input data reset
      e.target.reset(); 
        allProductData();
    }
   
}

 //submit form
    edit_modal_form.onsubmit = (e) => {
      e.preventDefault();
      const formUp = new FormData(e.target);
      const {name,price,quantity,photo,index} = Object.fromEntries(formUp.entries());

      let allData = readLsData('product');
      allData[index] = {name,price,quantity,photo};
      
      upLsData('product', allData);
      allProductData();
   }
