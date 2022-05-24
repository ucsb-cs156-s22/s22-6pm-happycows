package edu.ucsb.cs156.happiercows.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
class UserCommonsKey implements Serializable {

    @Column(name = "commons_id")
    Long commonsId;

    @Column(name = "user_id")
    Long userId;
}