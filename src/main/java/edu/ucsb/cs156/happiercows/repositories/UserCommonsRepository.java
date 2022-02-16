package edu.ucsb.cs156.happiercows.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.happiercows.entities.UserCommons;

@Repository
public interface UserCommonsRepository extends CrudRepository<UserCommons, Long> {
    Optional<UserCommons> findByCommonsIdAndUserId(Long commonsId, Long userId );
}