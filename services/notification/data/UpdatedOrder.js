const updated_orders = [
  {
    "orderId": "order_001",
    "userId": "607c191e810c19729de860ea",  // John Doe
    "orderStatus": "Received Successfully",
    "previousStatus": "Pending",
    "isUpdated": true,
    "updateType": "order_received",
    "timestamp": "2025-01-18T10:00:00Z"
  },
  {
    "orderId": "order_002",
    "userId": "607c191e810c19729de860eb",  // Jane Smith
    "orderStatus": "Ready for Shipping",
    "previousStatus": "Received Successfully",
    "isUpdated": true,
    "updateType": "order_ready_for_shipping",
    "timestamp": "2025-01-18T11:00:00Z"
  },
  {
    "orderId": "order_003",
    "userId": "607c191e810c19729de860ec",  // Alice Johnson
    "orderStatus": "Shipped Successfully",
    "previousStatus": "Ready for Shipping",
    "isUpdated": true,
    "updateType": "order_shipped",
    "timestamp": "2025-01-18T12:00:00Z"
  },
  {
    "orderId": "order_004",
    "userId": "607c191e810c19729de860ed",  // Bob Brown
    "orderStatus": "Received Successfully",
    "previousStatus": "Pending",
    "isUpdated": true,
    "updateType": "order_received",
    "timestamp": "2025-01-18T09:00:00Z"
  },
  {
    "orderId": "order_005",
    "userId": "607c191e810c19729de860ee",  // Charlie Green
    "orderStatus": "Ready for Shipping",
    "previousStatus": "Received Successfully",
    "isUpdated": true,
    "updateType": "order_ready_for_shipping",
    "timestamp": "2025-01-18T13:00:00Z"
  },
  {
    "orderId": "order_006",
    "userId": "607c191e810c19729de860ef",  // David White
    "orderStatus": "Shipped Successfully",
    "previousStatus": "Ready for Shipping",
    "isUpdated": true,
    "updateType": "order_shipped",
    "timestamp": "2025-01-18T14:00:00Z"
  }
];

export default updated_orders;
