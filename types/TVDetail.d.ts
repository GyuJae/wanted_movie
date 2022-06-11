import { ITVCredits, ITVDetail, ITVResult } from './tv.d'

export interface ITVDetailPage {
  tv: ITVDetail
  credits: ITVCredits
  recommendations: ITVResult
  similar: ITVResult
}
