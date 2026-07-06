import HomeController from './HomeController'
import FormationController from './FormationController'
import CertificationController from './CertificationController'
import CandidatureController from './CandidatureController'

const Public = {
    HomeController: Object.assign(HomeController, HomeController),
    FormationController: Object.assign(FormationController, FormationController),
    CertificationController: Object.assign(CertificationController, CertificationController),
    CandidatureController: Object.assign(CandidatureController, CandidatureController),
}

export default Public