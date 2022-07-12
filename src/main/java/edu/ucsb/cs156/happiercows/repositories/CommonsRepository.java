package edu.ucsb.cs156.happiercows.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import edu.ucsb.cs156.happiercows.entities.Commons;


@Repository
public interface CommonsRepository extends CrudRepository<Commons, Long> {
    @Query("SELECT sum(uc.numOfCows) from user_commons uc where uc.commonsId=:commonsId")
    Optional<Integer> getNumCows(Long commonsId);

    @Query("SELECT COUNT(uc.userId) FROM user_commons uc WHERE uc.commonsId=:commonsId")
    Optional<Integer> getNumUsers(Long commonsId);
    
}
