package edu.ucsb.cs156.happiercows.repositories;

import edu.ucsb.cs156.happiercows.entities.Profit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfitRepository extends CrudRepository<Profit, Long> {
    Iterable<Profit> findAllByUserCommonsId(Long user_commons_id);
}