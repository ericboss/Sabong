module.exports.validateRegisterInput = (
  firstName,
  lastName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    
   
  ) => {
    const errors = {};
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (lastName.trim() === '') {
      errors.lastName = 'last name must not be empty';
    }
    if (firstName.trim() === '') {
      errors.firstName = 'First name must not be empty';
    }
    if (phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone Number must not be empty';
    }

    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } 
     
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    
    if (password === '') {
      errors.password = 'Password must not empty';
    } 
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };