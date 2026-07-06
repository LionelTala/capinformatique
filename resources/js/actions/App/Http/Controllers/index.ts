import Public from './Public'
import Auth from './Auth'
import Admin from './Admin'

const Controllers = {
    Public: Object.assign(Public, Public),
    Auth: Object.assign(Auth, Auth),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers