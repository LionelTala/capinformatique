import DashboardController from './DashboardController'
import UserController from './UserController'
import FormationController from './FormationController'
import CertificationController from './CertificationController'
import VagueController from './VagueController'
import CandidatureController from './CandidatureController'
import StudentController from './StudentController'
import CoursController from './CoursController'
import DevoirController from './DevoirController'
import EvaluationController from './EvaluationController'
import GalerieController from './GalerieController'
import ActiviteController from './ActiviteController'
import NotificationController from './NotificationController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    UserController: Object.assign(UserController, UserController),
    FormationController: Object.assign(FormationController, FormationController),
    CertificationController: Object.assign(CertificationController, CertificationController),
    VagueController: Object.assign(VagueController, VagueController),
    CandidatureController: Object.assign(CandidatureController, CandidatureController),
    StudentController: Object.assign(StudentController, StudentController),
    CoursController: Object.assign(CoursController, CoursController),
    DevoirController: Object.assign(DevoirController, DevoirController),
    EvaluationController: Object.assign(EvaluationController, EvaluationController),
    GalerieController: Object.assign(GalerieController, GalerieController),
    ActiviteController: Object.assign(ActiviteController, ActiviteController),
    NotificationController: Object.assign(NotificationController, NotificationController),
}

export default Admin