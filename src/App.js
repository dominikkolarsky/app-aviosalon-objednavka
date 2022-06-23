import './App.css';
import { FormSection, Formular, InputDiv, KontrolaButton, MainTitle, PageContainer, SectionTitle, Podekovani } from './AppStyles';

import { useReducer, useEffect } from 'react';

// initialState pro useReducer
const defaultObjednavka = {
  typ: 500,
  osoby: 1,
  zpatecni: false,

  trida: 0,

  rozpocet: 0,
  finalPrice: 500,
  showFinalPrice: 500,
  checkRozpocet: false,
  poznamka: '',
};

// reducer funkce pro useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "toggle_text":
      return { ...objednavka, [action.key]: action.value };
    case "toggle_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "toggle_boolean":
      let newBool = !objednavka[action.key]
      return { ...objednavka, [action.key]: newBool };
    default: return objednavka;
  }
}


function App() {

  //state pro useReducer hooku
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  useEffect(() => { console.log(JSON.stringify(objednavka)) }, [objednavka]);
  // useEffect
  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    objednavka.showFinalPrice = newFinalPrice;
    console.log(objednavka.showFinalPrice)
  }, [objednavka]);



  const getFinalPrice = (objednavka) => {
    let basePrice = objednavka.osoby * objednavka.typ;
    let thisFinalPrice = basePrice;


    if (objednavka.zpatecni) { thisFinalPrice += thisFinalPrice }

    if (objednavka.trida === 0.25) { thisFinalPrice += (thisFinalPrice * 0.25) }
    else if (objednavka.trida === 0.50) { thisFinalPrice += (thisFinalPrice * 0.50) }

    objednavka.finalPrice = thisFinalPrice;
    return thisFinalPrice;
  };



  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis"><MainTitle>Vaše objednávka letenky</MainTitle></FormSection>
        <FormSection name="vyber">
          <SectionTitle>Výběr letenky</SectionTitle>
          {/* Výběr typu letenky */}
          <label>Výběr letenky:</label>
          <select id='typ' onClick={(e) => {
            dispatch({
              type: 'toggle_number',
              value: e.target.value,
              key: 'typ'
            })
          }}>
            <option value={500}>Praha</option>
            <option value={3000}>Frankfurt</option>
            <option value={15000}>New York</option>
            <option value={30000}>Sydney</option>
          </select>
          {/* Počet osob */}
          <label>Počet osob:</label>
          <select id="osoby" onClick={(e) => {
            dispatch({
              type: 'toggle_number',
              value: e.target.value,
              key: 'osoby'
            })
          }}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <InputDiv>
            <input type="checkbox" id="zpatecni" onClick={(e) => {
              dispatch({
                type: 'toggle_boolean',
                value: e.target.value,
                key: 'typ'
              })
            }} />
            <label>Zpáteční letenka</label>
          </InputDiv>
        </FormSection>
        {/* Výběr třídy */}
        <FormSection name="trida">
          <SectionTitle>Výběr třídy</SectionTitle>
          <div>
            <InputDiv>
              <input type="radio" name="trida" id="economy" value={0} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'trida'
                })
              }} />
              <label>Economy class(+0 Kč)</label>
            </InputDiv>
            <InputDiv>
              <input type="radio" name="trida" id="business" value={0.25} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'trida'
                })
              }} />
              <label>Business class(+25%)</label>
            </InputDiv>
            <InputDiv>
              <input type="radio" name="trida" id="royal" value={0.50} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'trida'
                })
              }} />
              <label>Royal class(+50%)</label>
            </InputDiv>
          </div>

        </FormSection>

        <FormSection name="kalkulace">
          {/* final cena */}
          <SectionTitle>Konečná kalkulace</SectionTitle>

          <label>Finální cena:</label>
          <input type="text" id="finalniCena" value={objednavka.showFinalPrice} disabled />

          <label>Zadejte váš rozpočet:</label>
          <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type: "toggle_number",
              value: e.target.value,
              key: "rozpocet",
            });
          }} />

          {/* pro kontrolu */}
          <KontrolaButton >
            Bude mi to stačit?
          </KontrolaButton>
          <div></div>
        </FormSection>
        <FormSection name="poznamka">
          <SectionTitle>Poznámka</SectionTitle>
          <textarea id="poznamka" cols="40" rows="10" placeholder="Zde můžete napsat poznámku..."></textarea>
        </FormSection>
      </Formular>
    </PageContainer>


  );
}

export default App;
