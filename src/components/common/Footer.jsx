import { profile } from '../../data/profile'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  )
}
