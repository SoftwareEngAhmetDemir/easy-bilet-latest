import express from 'express';

const router = express.Router()

import yeniKayit from '../controllers/yenikayit';
import login from '../controllers/login';
import seyahatlar from '../controllers/seyahatlar';
import updateSeyahatlat from '../controllers/update-seyahatlar';
import odeme from '../controllers/odeme';
import logout from '../controllers/logout';
import decode from '../controllers/decode';
import seyahatlarim from '../controllers/seyahatlarim';
import refreshToken from '../controllers/refreshToken';

router.use('/yeniKayit', yeniKayit)
router.use('/login', login)
router.use('/logout', logout)
router.use('/seyahatlar',seyahatlar)
router.use('/updateseyahatlar',updateSeyahatlat)
router.use('/odeme',odeme)
router.use('/decode',decode)

router.use('/seyahatlarim',seyahatlarim)

router.use('/refreshToken',refreshToken)
module.exports = router