import { Router } from 'express';
import materialRoutes from './materials/materialRoutes.js';
import entityRoutes from './entities/entitiesRoutes.js';
import assignmentRoutes from './assignments/assignmentRoutes.js';

const apiRouter = Router();

apiRouter.use('/materials', materialRoutes);
apiRouter.use('/entities', entityRoutes);
apiRouter.use('/assignments', assignmentRoutes)


export default apiRouter;



