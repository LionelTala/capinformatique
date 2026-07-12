import HomeController from './HomeController'
import FormationController from './FormationController'
import CertificationController from './CertificationController'
import CandidatureController from './CandidatureController'
import GalerieController from './GalerieController'
import ActiviteController from './ActiviteController'

const Public = {
    HomeController: Object.assign(HomeController, HomeController),
    FormationController: Object.assign(FormationController, FormationController),
    CertificationController: Object.assign(CertificationController, CertificationController),
    CandidatureController: Object.assign(CandidatureController, CandidatureController),
    GalerieController: Object.assign(GalerieController, GalerieController),
    ActiviteController: Object.assign(ActiviteController, ActiviteController),
}

export default Public