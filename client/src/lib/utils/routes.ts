export const dashboard = {
  index: '/dashboard/',
  orders: '/dashboard/orders',
  products: {
    index: '/dashboard/products',
    create: '/dashboard/products/create',
  },
  settings: '/dashboard/settings',
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

export const user = {
  profile: {
    start: '/u/profile/start',
  },
}

export const home = '/'

export const products = {
  index: '/products',
}

export const legal = {
  privacyTerms: '/legal/privacy-terms',
}

export const contactUs = '/contact-us'

export default {
  dashboard,
  session,
  user,
  home,
  products,
  legal,
  contactUs,
}
