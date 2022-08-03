import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setGuest } from '../../store/slices/app';
import styles from './../../styles/Header.module.css';

const Header = ()=>{
  const { user } = useAppSelector(state=>state.app);
  const dispath = useAppDispatch();

  const onSignOut = ()=>{
    window.google.accounts.id.disableAutoSelect();

    dispath(setGuest());
  }

  return(
    <nav className={styles.nav}>
      <div className={styles.contProfile}>
        {
          user &&
          <div>
            <button onClick={onSignOut}>Sign Out</button>
          </div>
        }
      </div>
    </nav>
  );
};

export default Header;