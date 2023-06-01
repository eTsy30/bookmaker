import React from 'react'

import './TableBet.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Loader } from 'components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { BetContext } from '../../App'
import { ModalAlert } from 'components/ModalAlert/ModalAlert'
import { apiUrl } from 'utils/Constants'

export const TableBet = () => {
  const { context } = useContext(BetContext)
  const [stateModal, setStateModal] = useState(false)
  const navigate = useNavigate()
  const openModal = () => setStateModal(true)
  const closeModal = () => setStateModal(false)
  const [dataState, setdataState] = useState()

  useEffect(() => {
    axios.get(apiUrl).then((resp) => {
      const allBets = resp.data
      setdataState(allBets.filter((bet) => new Date(bet.Date) > new Date()))
      if (context) {
        openModal()
      }
    })
  }, [setdataState])

  const result =
    dataState &&
    dataState.reduce((sum, current) => {
      if (current.bet === 'team1') {
        return sum + Number(current.ratioFirstTeam)
      }
      if (current.bet === 'team2') {
        return sum + Number(current.ratioFirstTeam)
      }
      if (current.bet === 'both') {
        return sum + Number(current.ratioFirstTeam)
      }
      return sum
    }, 0)
  if (!dataState) return <Loader />

  return (
    <div className='table_container'>
      {stateModal && <ModalAlert text={context} open={stateModal} close={closeModal} />}
      <div className='totalResuitStyle'>
        <span> Общий коэффицент : {result}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Время</th>
            <th>Событие</th>
            <th className='selRatio '>П1</th>
            <th className='selRatio'>x</th>
            <th className='selRatio'>П2</th>
          </tr>
        </thead>
        <tbody>
          {dataState &&
            dataState.map((betLine, index) => {
              return (
                <tr onClick={() => navigate(`/bet/${betLine.id}`)}>
                  <td>{index + 1}</td>
                  <td>
                    {betLine.Date.slice(0, 10)} {betLine.Date.slice(11, 16)}
                  </td>
                  <td>
                    <span className='textFirstTeam'> {betLine.FirstTeam}</span> VS{' '}
                    <span className='textSecondTeam'> {betLine.SecondTeam}</span>
                  </td>

                  <td className={betLine.bet === 'team1' ? 'selRatio betCheck' : 'selRatio'}>
                    {betLine.ratioFirstTeam}
                  </td>
                  <td className={betLine.bet === 'both' ? 'selRatio betCheck' : 'selRatio'}>{betLine.ratioX}</td>
                  <td className={betLine.bet === 'team2' ? 'selRatio betCheck' : 'selRatio'}>
                    {betLine.ratioSecondTeam}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
