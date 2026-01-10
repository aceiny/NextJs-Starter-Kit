"use client";;
import UniversalFilters from "@/components/shared/universal-filters";
import { FiltersConfig } from "@/types/shared/interface/filter-config.interface";
import { useAllSearchParams } from "@/hooks/shared/use-query-params";
import { SlidersHorizontal, Package, Users, Calendar } from "lucide-react";

export default function UniversalFiltersExample() {
  const params = useAllSearchParams();

  // Example 1: User Management Filters (Tabs Mode)
  const userFilters: FiltersConfig = {
    filters: [
      {
        name: "Search Users",
        param: "userSearch",
        type: "text",
        placeholder: "Search by name or email...",
        helperText: "Search users by name, email, or username",
      },
      {
        name: "Status",
        param: "userStatus",
        type: "select",
        placeholder: "Select status",
        options: [
          { label: "All Statuses", value: "all" },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Pending", value: "pending" },
          { label: "Suspended", value: "suspended" },
        ],
      },
      {
        name: "Role",
        param: "userRole",
        type: "multiselect",
        placeholder: "Select roles",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Moderator", value: "moderator" },
          { label: "Editor", value: "editor" },
        ],
        helperText: "Select one or more roles",
      },
      {
        name: "Created After",
        param: "userCreatedAfter",
        type: "date",
      },
      {
        name: "Email Verified",
        param: "userEmailVerified",
        type: "checkbox",
      },
    ],
    showReset: true,
    resetButtonText: "Clear All Filters",
    onReset: () => {
      console.log("User filters reset");
    },
  };

  // Example 2: Product Filters (Dropdown Mode)
  const productFilters: FiltersConfig = {
    filters: [
      {
        name: "Search Products",
        param: "productSearch",
        type: "text",
        placeholder: "Search products...",
      },
      {
        name: "Category",
        param: "productCategory",
        type: "select",
        options: [
          { label: "All Categories", value: "all" },
          { label: "Electronics", value: "electronics" },
          { label: "Clothing", value: "clothing" },
          { label: "Books", value: "books" },
          { label: "Home & Garden", value: "home" },
          { label: "Sports", value: "sports" },
        ],
      },
      {
        name: "Price Range (Max)",
        param: "productMaxPrice",
        type: "number",
        min: 0,
        max: 10000,
        step: 10,
        placeholder: "Max price",
      },
      {
        name: "Min Rating",
        param: "productMinRating",
        type: "number",
        min: 1,
        max: 5,
        step: 0.5,
        placeholder: "Minimum rating",
      },
      {
        name: "In Stock Only",
        param: "productInStock",
        type: "checkbox",
      },
      {
        name: "Sort By",
        param: "productSortBy",
        type: "radio",
        options: [
          { label: "Newest First", value: "newest" },
          { label: "Price: Low to High", value: "price_asc" },
          { label: "Price: High to Low", value: "price_desc" },
          { label: "Most Popular", value: "popular" },
          { label: "Best Rated", value: "rating" },
        ],
      },
      {
        name: "Features",
        param: "productFeatures",
        type: "checkbox-group",
        options: [
          { label: "Free Shipping", value: "free_shipping" },
          { label: "On Sale", value: "on_sale" },
          { label: "New Arrivals", value: "new" },
          { label: "Bestseller", value: "bestseller" },
        ],
      },
    ],
    showReset: true,
    showApplyButton: true,
    applyButtonText: "Apply Filters",
    onApply: (values) => {
      console.log("Product filters applied:", values);
    },
  };

  // Example 3: Event Filters
  const eventFilters: FiltersConfig = {
    filters: [
      {
        name: "Event Name",
        param: "eventName",
        type: "text",
        placeholder: "Search events...",
      },
      {
        name: "Event Type",
        param: "eventType",
        type: "checkbox-group",
        options: [
          { label: "Conference", value: "conference" },
          { label: "Workshop", value: "workshop" },
          { label: "Webinar", value: "webinar" },
          { label: "Meetup", value: "meetup" },
          { label: "Seminar", value: "seminar" },
        ],
      },
      {
        name: "Start Date",
        param: "eventStartDate",
        type: "date",
      },
      {
        name: "End Date",
        param: "eventEndDate",
        type: "date",
      },
      {
        name: "Location",
        param: "eventLocation",
        type: "text",
        placeholder: "City or venue",
      },
      {
        name: "Capacity (Max)",
        param: "eventCapacity",
        type: "number",
        min: 0,
        placeholder: "Maximum attendees",
      },
    ],
    showReset: true,
  };

  // Example 4: Order Filters (Compact Dropdown)
  const orderFilters: FiltersConfig = {
    filters: [
      {
        name: "Order ID",
        param: "orderId",
        type: "text",
        placeholder: "Search by order ID...",
      },
      {
        name: "Customer Email",
        param: "orderEmail",
        type: "email",
        placeholder: "customer@example.com",
      },
      {
        name: "Status",
        param: "orderStatus",
        type: "multiselect",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ],
      },
      {
        name: "Order Date From",
        param: "orderDateFrom",
        type: "date",
      },
      {
        name: "Order Date To",
        param: "orderDateTo",
        type: "date",
      },
      {
        name: "Min Amount",
        param: "orderMinAmount",
        type: "number",
        min: 0,
        placeholder: "Minimum order amount",
      },
    ],
    showReset: true,
    showApplyButton: true,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Universal Filters - Examples
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive filtering component with URL synchronization and
            multiple display modes
          </p>
        </div>

        {/* Example 1: User Management Filters (Tabs Mode) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                1. User Management Filters
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tabs mode - Best for desktop with fewer filters
              </p>
            </div>
          </div>

          <UniversalFilters config={userFilters} mode="tabs" />

          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Current URL Parameters:
            </p>
            <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(params).filter(([key]) =>
                    key.startsWith("user")
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>
        </section>

        {/* Example 2: Product Filters (Dropdown Mode) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                2. Product Filters
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dropdown mode - Compact and mobile-friendly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UniversalFilters
              config={productFilters}
              mode="dropdown"
              dropdownButtonText="Filter Products"
              dropdownIcon={<SlidersHorizontal />}
              dropdownButtonSize="lg"
            />

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Tip:</span> Click the button to
              open filters
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Current URL Parameters:
            </p>
            <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(params).filter(([key]) =>
                    key.startsWith("product")
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>
        </section>

        {/* Example 3: Event Filters */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                3. Event Filters
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Date range filtering with checkboxes
              </p>
            </div>
          </div>

          <UniversalFilters config={eventFilters} mode="tabs" />

          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Current URL Parameters:
            </p>
            <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(params).filter(([key]) =>
                    key.startsWith("event")
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>
        </section>

        {/* Example 4: Order Filters (Small Dropdown) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              4. Order Filters
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small dropdown with apply button
            </p>
          </div>

          <UniversalFilters
            config={orderFilters}
            mode="dropdown"
            dropdownButtonSize="sm"
          />

          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Current URL Parameters:
            </p>
            <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(params).filter(([key]) =>
                    key.startsWith("order")
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>
        </section>

        {/* All Parameters Debug */}
        <details className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100 text-lg">
            Debug: All URL Parameters
          </summary>
          <pre className="mt-4 text-xs overflow-auto text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            {JSON.stringify(params, null, 2)}
          </pre>
        </details>

        {/* Feature List */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            ✨ Universal Filters Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800 dark:text-blue-200">
            <div>✅ URL Parameter Synchronization</div>
            <div>✅ Two Display Modes (Tabs & Dropdown)</div>
            <div>✅ 13 Filter Types</div>
            <div>✅ Auto-debouncing for Text Inputs</div>
            <div>✅ Active Filter Count Badge</div>
            <div>✅ Reset Functionality</div>
            <div>✅ Dark Mode Support</div>
            <div>✅ Mobile Responsive</div>
            <div>✅ TypeScript Support</div>
            <div>✅ Form Validation</div>
            <div>✅ Customizable Styling</div>
            <div>✅ Apply Button (Dropdown Mode)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
