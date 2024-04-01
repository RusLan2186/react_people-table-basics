import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={person.slug}
          className={classNames('', {
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother ? (
        <td>
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}
      {person.father ? (
        <td>
          <Link to={`/people/${person.father.slug}`}>{person.father.name}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
