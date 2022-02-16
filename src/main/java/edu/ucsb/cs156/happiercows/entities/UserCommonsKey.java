package edu.ucsb.cs156.happiercows.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
class UserCommonsKey implements Serializable {

    @Column(name = "commons_id")
    Long commonsId;

    @Column(name = "user_id")
    Long userId;

    // standard constructors, getters, and setters
    // hashcode and equals implementation
}