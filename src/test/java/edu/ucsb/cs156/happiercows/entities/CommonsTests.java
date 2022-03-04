package edu.ucsb.cs156.happiercows.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class CommonsTests
{
    @Test
    public void testEquality() {
        Commons grassySlope = new Commons();
        Commons rollingMeadows = new Commons();
        assertEquals(grassySlope, rollingMeadows);
    }

    @Test
    public void testInequality() {
        Commons grassySlope = new Commons();
        String cow = "moo";
        assertNotEquals(grassySlope, cow);
    }
}
