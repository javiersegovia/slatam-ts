interface DashboardRoutes {
  index: string
  orders: string
  products: {
    index: string
    create: string
  }
  account: {
    index: string
    settings: string
    preferences: string
    changePassword: string
  }
}

export const dashboard = {
  index: '/dashboard/',
  orders: '/dashboard/orders',
  products: {
    index: '/dashboard/products',
    create: '/dashboard/products/create',
  },
  account: {
    index: '/dashboard/account',
    settings: '/dashboard/account/settings',
    preferences: '/dashboard/account/preferences',
    changePassword: '/dashboard/account/change-password',
  },
}

interface SessionRoutes {
  changePassword: string
  pleaseVerify: string
  requestConfirmationEmail: string
  requestPassword: string
  signIn: string
  signUp: string
  signOut: string
  verifyEmail: string
}

export const session = {
  changePassword: '/s/change-password',
  pleaseVerify: '/s/please-verify',
  requestConfirmationEmail: '/s/req-confirmation-email',
  requestPassword: '/s/request-password',
  signIn: '/s/sign-in',
  signUp: '/s/sign-up',
  signOut: '/s/sign-out',
  verifyEmail: '/s/verify-email',
}

interface UserRoutes {
  setup: {
    profile: string
    company: string
    verification: string
  }
}

export const user: UserRoutes = {
  setup: {
    profile: '/u/setup/profile',
    company: '/u/setup/company',
    verification: '/u/setup/verification',
  },
}

export const home = '/'

interface ProductsRoutes {
  index: string
}

export const products = {
  index: '/products',
}

interface LegalRoutes {
  privacyTerms: string
}

export const legal = {
  privacyTerms: '/legal/privacy-terms',
}

export const contactUs = '/contact-us'

interface IRoutes {
  contactUs: string
  dashboard: DashboardRoutes
  home: string
  user: UserRoutes
  legal: LegalRoutes
  session: SessionRoutes
  products: ProductsRoutes
}

const routes: IRoutes = {
  dashboard,
  session,
  user,
  home,
  products,
  legal,
  contactUs,
}

export default routes
