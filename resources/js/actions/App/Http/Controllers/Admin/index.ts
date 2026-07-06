import DashboardController from './DashboardController'
import UserController from './UserController'
import FormationController from './FormationController'
import CertificationController from './CertificationController'
import VagueController from './VagueController'
import CandidatureController from './CandidatureController'
import NotificationController from './NotificationController'
import HeroSlideController from './HeroSlideController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    UserController: Object.assign(UserController, UserController),
    FormationController: Object.assign(FormationController, FormationController),
    CertificationController: Object.assign(CertificationController, CertificationController),
    VagueController: Object.assign(VagueController, VagueController),
    CandidatureController: Object.assign(CandidatureController, CandidatureController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    HeroSlideController: Object.assign(HeroSlideController, HeroSlideController),
}

export default Admin