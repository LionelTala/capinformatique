import DashboardController from './DashboardController'
import CoursController from './CoursController'
import DevoirController from './DevoirController'
import EvaluationController from './EvaluationController'

const Student = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    CoursController: Object.assign(CoursController, CoursController),
    DevoirController: Object.assign(DevoirController, DevoirController),
    EvaluationController: Object.assign(EvaluationController, EvaluationController),
}

export default Student