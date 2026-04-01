CREATE TABLE merchant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    merchantId VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

/*    install packages

// server side
npm install express-rate-limit


// client side 
npm install xlsx file-saver
*/

INSERT INTO merchant 
(merchantId, name, email, password)
VALUES
(
  'SKLRM#MER2026001',
  'merchantD',
  'merchant@gmail.com',
  '$2a$12$6ci2nZiS/DPIHrhoKlRp..BU2kH3GrJuAEsve9TyRKEJt65EazM.C'
);


