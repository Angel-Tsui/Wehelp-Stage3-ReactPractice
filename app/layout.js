// layout.js codes will be applied in all pages as fundamentals
import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <html>
      <body className={styles.mainContainer}>
          {children}
      </body>
    </html>
  )
}
