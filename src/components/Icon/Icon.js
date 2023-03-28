import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faEllipsisVertical,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const Icon = ({ icon }) => {
  const icons = {
    faBars: faBars,
    faEllipsisVertical: faEllipsisVertical,
    faMagnifyingGlass: faMagnifyingGlass,
    faCircleCheck: faCircleCheck,
  };

  return <FontAwesomeIcon icon={icons[icon]} />;
};

export default Icon;
