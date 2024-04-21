import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env.local') })

export default dotenv
