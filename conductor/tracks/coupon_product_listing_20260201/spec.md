# Track: Implement core coupon display and product listing functionality

## Specification

### Overview
This track focuses on implementing the core functionality for displaying coupons and product listings within the CouponCupid application. It involves both backend (Express.js) and frontend (Vue.js) development to ensure seamless integration and a functional user experience.

### Backend (Express.js) Requirements

1.  **API Endpoint for Products:**
    *   Create an endpoint (e.g., `/api/products`) that retrieves a list of products from the PostgreSQL database.
    *   The endpoint should support filtering (e.g., by store, category) and pagination.
    *   Each product object should include: `id`, `name`, `description`, `price`, `store`, `category`, and a link to its image.
2.  **API Endpoint for Coupons:**
    *   Create an endpoint (e.g., `/api/coupons`) that retrieves a list of available coupons from the PostgreSQL database.
    *   The endpoint should support filtering (e.g., by store, product, expiration date) and pagination.
    *   Each coupon object should include: `id`, `product_id`, `description`, `discount_value`, `expiration_date`, `store`, and `terms_and_conditions`.
3.  **Database Integration:**
    *   Ensure the Express.js application correctly connects to the PostgreSQL database.
    *   Implement data retrieval logic using appropriate database drivers (e.g., `pg` for Node.js).
4.  **Error Handling:**
    *   Implement robust error handling for API endpoints to provide meaningful error messages.
    *   Handle cases where no products or coupons are found.

### Frontend (Vue.js) Requirements

1.  **Product Listing Component:**
    *   Create a Vue component (e.g., `ProductList.vue`) to display the retrieved products.
    *   Each product should be displayed with its name, price, store, and an image.
    *   Implement filtering options (e.g., dropdowns for store, category) to refine the product list.
    *   Implement pagination controls to navigate through product pages.
2.  **Coupon Display Component:**
    *   Create a Vue component (e.g., `CouponDisplay.vue`) to display available coupons.
    *   Each coupon should clearly show its description, discount value, and expiration date.
    *   Allow users to filter coupons by store or product.
3.  **Integration with Backend APIs:**
    *   Utilize `fetch` or `axios` to make HTTP requests to the Express.js backend for product and coupon data.
    *   Manage loading states, error states, and data display within the Vue components.
4.  **User Interface (UI):**
    *   Adhere to Bootstrap guidelines for responsive and consistent styling.
    *   Ensure a user-friendly layout for both product and coupon listings.
5.  **State Management:**
    *   Implement Vuex or a similar state management pattern to manage product and coupon data across components.

### Acceptance Criteria

*   Users can view a list of products retrieved from the backend.
*   Users can filter products by store and category.
*   Users can navigate through paginated product lists.
*   Users can view a list of coupons retrieved from the backend.
*   Users can filter coupons by store or product.
*   All data displayed is accurate and consistent with the backend.
*   The application remains responsive and stable during data retrieval and display.
