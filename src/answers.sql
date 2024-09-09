-- Problem 1
SELECT email
FROM customers
ORDER BY email;

-- Problem 2
SELECT id
FROM orders
WHERE customer_id = (
  SELECT id
  FROM customers
  WHERE fname = 'Elizabeth' AND lname = 'Crocker'
);

-- Problem 3
SELECT SUM(num_cupcakes) AS sum
FROM orders
WHERE processed = FALSE;

-- Problem 4
SELECT c.name AS name, COALESCE(SUM(o.num_cupcakes), 0) AS sum
FROM cupcakes c
LEFT JOIN orders o ON c.id = o.cupcake_id
GROUP BY c.name
ORDER BY c.name;

-- Problem 5
SELECT c.email, COALESCE(SUM(o.num_cupcakes), 0) AS total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.email
ORDER BY total DESC;

-- Problem 6
SELECT DISTINCT cu.fname, cu.lname, cu.email
FROM customers cu
JOIN orders o ON cu.id = o.customer_id
JOIN cupcakes c ON o.cupcake_id = c.id
WHERE c.name = 'funfetti' AND o.processed = TRUE;



