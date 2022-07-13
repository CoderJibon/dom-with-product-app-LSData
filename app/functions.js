
/**
 * Alert function 
 */
 const setAlert = ( msg , type = 'danger') =>  {
    return `<p class="alert alert-${type} d-flex justify-content-between">${ msg } <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}

/**
 * Check value is Number or not 
 */
const numberCheck = (num) => {
    let pattern = /^[0-9]{1,}$/;
    return pattern.test(num);

}


/**
 * Check value is Number or not 
 */
 const emailCheck = (email) => {
    let pattern = /^[a-z0-9_\.]{1,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
    return pattern.test(email);

} 


/**
 * Check value is Number or not 
 */
 const cellCheck = (cell) => {
    let pattern = /^(01|8801|\+8801)[0-9]{9}$/;
    return pattern.test(cell);

}




/**
 * Set value LS
 */

const setLsData = (key, value) => {
    
    //data add
    let data = [];
    
    // check local store data
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    
    // data pushing
    data.push(value);
   
    // Set Local Store
    localStorage.setItem(key, JSON.stringify(data));

 }


/**
 * get all LS data 
 */

const readLsData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}


/**
 * Set value LS
 */

const upLsData = (key, value) => {
    
    // Set Local Store
    localStorage.setItem(key, JSON.stringify(value));

 }


