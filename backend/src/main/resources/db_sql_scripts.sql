
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema movie_selector
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `movie_selector` ;

-- -----------------------------------------------------
-- Schema movie_selector
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movie_selector` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `movie_selector` ;

-- -----------------------------------------------------
-- Table `movie_selector`.`movie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `movie_selector`.`movie` ;

CREATE TABLE IF NOT EXISTS `movie_selector`.`movie` (
  `id` INT NOT NULL,
  `original_name` VARCHAR(255) NULL DEFAULT NULL,
  `original_title` VARCHAR(255) NULL DEFAULT NULL,
  `poster_path` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_selector`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `movie_selector`.`user` ;

CREATE TABLE IF NOT EXISTS `movie_selector`.`user` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `photo_url` VARCHAR(255) NULL DEFAULT NULL,
  `updated` DATETIME(6) NULL DEFAULT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_selector`.`to_watch`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `movie_selector`.`to_watch` ;

CREATE TABLE IF NOT EXISTS `movie_selector`.`to_watch` (
  `user_id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `updated_at` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKm8g4j2uj8ps5uc24bs6rl6odk`
    FOREIGN KEY (`user_id`)
    REFERENCES `movie_selector`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_selector`.`to_watch_movies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `movie_selector`.`to_watch_movies` ;

CREATE TABLE IF NOT EXISTS `movie_selector`.`to_watch_movies` (
  `to_watch_lists_user_id` VARCHAR(255) NOT NULL,
  `movies_id` INT NOT NULL,
  INDEX `FKt0wt3lv42pcuvliwka4n9lb8w` (`movies_id` ASC) VISIBLE,
  INDEX `FKjit0q5n5jht6vl0t4c9mof6em` (`to_watch_lists_user_id` ASC) VISIBLE,
  CONSTRAINT `FKjit0q5n5jht6vl0t4c9mof6em`
    FOREIGN KEY (`to_watch_lists_user_id`)
    REFERENCES `movie_selector`.`to_watch` (`user_id`),
  CONSTRAINT `FKt0wt3lv42pcuvliwka4n9lb8w`
    FOREIGN KEY (`movies_id`)
    REFERENCES `movie_selector`.`movie` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
