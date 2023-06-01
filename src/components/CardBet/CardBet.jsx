import React, { useState, useEffect, useContext } from 'react'
import './CardBet.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from 'components/Loader/Loader'
import { BetContext } from '../../App'
import { apiUrl } from 'utils/Constants'
export const CardBet = () => {
  const [dataState, setdataState] = useState()
  const [dataBet, setdataBet] = useState()
  const [ratio, setratio] = useState()
  const { setContext } = useContext(BetContext)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(apiUrl + id).then((resp) => {
      const allBets = resp.data
      setdataState(allBets)
    })
  }, [setdataState])

  async function SubmitButton() {
    const response = await axios.put(apiUrl + id, { bet: dataBet })
    setContext(ratio)
    if (response.statusText) {
      navigate('/')
    }
  }
  const changeRadioButton = (e, team, bet) => {
    setratio({ team, bet })
    setdataBet(e.target.value)
  }
  if (!dataState) return <Loader />
  return (
    <div className='cardBet_container'>
      <div className='cardBet_cardWrapper'>
        {dataState && (
          <>
            <div className='titleParent'>
              <h4 className='titte1'>{dataState.FirstTeam}</h4>
              <div className='titte2'>
                <h4 className='date_time_style'>{dataState.Date.slice(0, 10)}</h4>
                <h4 className='date_time_style'>{dataState.Date.slice(11, 16)}</h4>
              </div>
              <h4 className='titte3'>{dataState.SecondTeam}</h4>
            </div>
            <form className='titleParent'>
              <div className='radio_button radioButton1'>
                <input
                  type='radio'
                  value='team1'
                  name='bet'
                  onChange={(e) => changeRadioButton(e, dataState.FirstTeam, dataState.ratioFirstTeam)}
                />
                <label className='btn btn-default'>{dataState.ratioFirstTeam}</label>
              </div>

              <div className='radio_button radioButton2'>
                <input
                  type='radio'
                  value='both'
                  name='bet'
                  onChange={(e) => changeRadioButton(e, 'both', dataState.ratioX)}
                />
                <label className='btn btn-default'>{dataState.ratioX}</label>
              </div>

              <div className='radio_button radioButton3'>
                <input
                  type='radio'
                  value='team2'
                  name='bet'
                  onChange={(e) => changeRadioButton(e, dataState.SecondTeam, dataState.ratioSecondTeam)}
                />
                <label className='btn btn-default'>{dataState.ratioSecondTeam}</label>
              </div>
            </form>
            <button className='button_submit' disabled={dataBet ? false : true} onClick={SubmitButton}>
              Сделать ставку
            </button>
          </>
        )}
      </div>
    </div>
  )
}
