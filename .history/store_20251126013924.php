<?php
header('Content-Type: application/json');
include 'connection.php';

// Support both /store.php/products and /store.php?endpoint=products
$endpoint = $_GET['endpoint'] ?? '';
if (empty($endpoint) && isset($_SERVER['PATH_INFO'])) {
    $endpoint = ltrim($_SERVER['PATH_INFO'], '/');
}

switch($endpoint) {

    case 'products':
        $stmt = $pdo->query("SELECT * FROM products");
        $products = $stmt->fetchAll();
        echo json_encode($products);
        break;

    case 'product_by_id':
        $id = intval($_GET['id'] ?? 0);
        if ($id <= 0) {
            echo json_encode(['error' => 'Invalid product ID']);
            break;
        }
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        echo json_encode($product ?: ['error' => 'Product not found']);
        break;

    case 'create_order':
        $data = json_decode(file_get_contents('php://input'), true);
        $product_id = intval($data['product_id'] ?? 0);
        $quantity = intval($data['quantity'] ?? 0);

        if ($product_id <= 0 || $quantity <= 0) {
            echo json_encode(['error' => 'Invalid product ID or quantity']);
            break;
        }


        $stmt = $pdo->prepare("SELECT price FROM products WHERE id = ?");
        $stmt->execute([$product_id]);
        $product = $stmt->fetch();
        if (!$product) {
            echo json_encode(['error' => 'Product not found']);
            break;
        }

        $total_price = $product['price'] * $quantity;

        $stmt = $pdo->prepare("INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)");
        $stmt->execute([$product_id, $quantity, $total_price]);

        echo json_encode([
            'success' => true,
            'order_id' => $pdo->lastInsertId(),
            'total_price' => $total_price
        ]);
        break;

    case 'orders_by_product':
        $product_id = intval($_GET['product_id'] ?? 0);
        if ($product_id <= 0) {
            echo json_encode(['error' => 'Invalid product ID']);
            break;
        }

        $stmt = $pdo->prepare("SELECT * FROM orders WHERE product_id = ? ORDER BY created_at DESC LIMIT 10");
        $stmt->execute([$product_id]);
        $orders = $stmt->fetchAll();
        echo json_encode($orders);
        break;

    default:
        echo json_encode(['error' => 'Invalid endpoint']);
        break;
}
?>