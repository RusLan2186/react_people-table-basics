import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {people.length > 0 && <PeopleTable people={people} />}
          {people.length < 1 && !isLoading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </div>
  );
};