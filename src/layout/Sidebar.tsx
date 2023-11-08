import Foto from '../../components/photo_2023-10-25_16-29-46.jpg'
export const Sidebar = () => {
  return (
    <aside className="main_screen_sidebar">

      <div className="sidebar_logo">

        <img src= {Foto} alt="lalala" />


      </div>

      <div >
        <h1>Jara-Travel</h1>
      </div>

      <div className="sidebar_buttons">

        <p>hoteles</p>

        <p className="mt-5">vuelos</p>
        <p>cruceros</p>
        <p>login</p>


      </div>


      <footer>
        <div className="footer">
          Travel Agency ©2023 Created by JaraTravel
        </div>
      </footer>

    </aside>
  )
}