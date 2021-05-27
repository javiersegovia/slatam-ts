import React from 'react'
import DropdownFeaturedItem from './DropdownFeaturedItem'

const MoreDropdownContent = () => (
  <>
    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      {/* Heroicon name: chart-bar */}
      <DropdownFeaturedItem
        href="/analytics"
        title="Analytics"
        description="Get a better understanding of where your traffic is coming from."
        icon={
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
      />

      {/* Heroicon name: cursor-click */}
      <DropdownFeaturedItem
        href="/engagement"
        title="Engagement"
        description="Speak directly to your customers in a more meaningful way."
        icon={
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
        }
      />

      {/* Heroicon name: shield-check */}
      <DropdownFeaturedItem
        href="/events"
        title="Events"
        description="Your customers data will be safe and secure."
        icon={
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        }
      />

      {/* Heroicon name: view-grid */}
      <DropdownFeaturedItem
        href="/resources"
        title="Resources"
        description="Connect with third-party tools that you're already using."
        icon={
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        }
      />

      {/* Heroicon name: refresh */}
      <DropdownFeaturedItem
        href="/dummy-text"
        title="Dummy Text"
        description="Build strategic funnels that will drive your customers to convert"
        icon={
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        }
      />
    </div>

    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
      <div>
        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
          Recent Posts
        </h3>
        <ul className="mt-4 space-y-4">
          <li className="text-base truncate">
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Boost your conversion rate
            </a>
          </li>
          <li className="text-base truncate">
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              How to use search engine optimization to drive traffic to your
              site
            </a>
          </li>
          <li className="text-base truncate">
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Improve your customer experience
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-5 text-sm">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all posts <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </>
)

export default MoreDropdownContent
