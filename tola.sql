-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 22 juil. 2024 à 02:45
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tola`
--

-- --------------------------------------------------------

--
-- Structure de la table `answers`
--

CREATE TABLE `answers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `question_id` int NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `answers`
--

INSERT INTO `answers` (`id`, `user_id`, `question_id`, `body`, `created_at`, `updated_at`) VALUES
(14, 4, 31, 'Commencez à réviser tôt et créez un planning d\'étude. Utilisez des fiches de révision et pratiquez avec des examens des années précédentes. N\'oubliez pas de prendre des pauses régulières pour éviter la surcharge mentale.', '2024-07-16 18:12:37', '2024-07-16 18:12:37'),
(15, 4, 31, 'Formez des groupes d\'étude avec vos camarades de classe. Cela permet de s\'entraider et de mieux comprendre les sujets complexes. Assurez-vous aussi de bien dormir la veille des examens.', '2024-07-16 18:12:48', '2024-07-16 18:12:48'),
(16, 4, 32, 'Les stages en entreprises technologiques comme Sonatel et Wave sont très prisés. Ils offrent une excellente expérience pratique et sont souvent bien rémunérés.', '2024-07-16 18:13:36', '2024-07-16 18:13:36'),
(17, 4, 32, 'Les stages dans les ONG et les projets de développement sont également populaires. Ils offrent une expérience enrichissante et permettent de contribuer à des causes sociales.', '2024-07-16 18:13:47', '2024-07-16 18:13:47'),
(18, 4, 33, 'Inscrivez-vous à des cours de préparation spécifiques pour le concours. Ils vous aideront à comprendre le format des questions et à gérer votre temps efficacement.', '2024-07-16 18:14:16', '2024-07-16 18:14:16'),
(19, 4, 33, 'Travaillez régulièrement sur les matières scientifiques et techniques. Utilisez des manuels spécialisés et faites beaucoup de pratique avec des exercices et des annales de concours précédents.', '2024-07-16 18:14:30', '2024-07-16 18:14:30'),
(20, 4, 34, 'Le club de débat est également très intéressant. Il vous permet de développer vos compétences en communication et en argumentation tout en discutant de sujets variés.', '2024-07-16 18:15:24', '2024-07-16 18:15:24'),
(21, 4, 35, 'Consultez les archives de la bibliothèque de l\'ESP pour des projets antérieurs. Vous y trouverez beaucoup d\'inspiration et de matériel de référence.', '2024-07-16 18:15:38', '2024-07-16 18:15:38'),
(22, 4, 35, 'Utilisez des plateformes en ligne comme ResearchGate et Google Scholar pour accéder à des articles de recherche. Vous pouvez également rejoindre des forums et des groupes LinkedIn dédiés à votre domaine d\'étude.', '2024-07-16 18:15:55', '2024-07-16 18:15:55');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `user_id`, `title`, `body`, `created_at`, `updated_at`) VALUES
(31, 4, 'Quels sont les meilleurs conseils pour réussir les examens finaux à l\'ESP ?', 'Je suis en première année à l\'ESP et je suis un peu stressé à l\'idée des examens finaux. Quels sont vos meilleurs conseils pour bien se préparer et réussir ?', '2024-07-16 18:03:11', '2024-07-16 18:03:11'),
(32, 4, 'Quels sont les stages les plus recherchés par les étudiants de l\'ESP ?', 'Je cherche un stage pour cet été et j\'aimerais savoir quels sont les stages les plus recherchés par les étudiants de l\'ESP. Des suggestions ?', '2024-07-16 18:11:04', '2024-07-16 18:11:04'),
(33, 4, 'Comment se préparer pour le concours d\'entrée à l\'ESP ?', 'Je suis en terminale et je veux passer le concours d\'entrée à l\'ESP. Quels sont les meilleurs moyens de se préparer pour réussir ce concours ?', '2024-07-16 18:11:28', '2024-07-16 18:11:28'),
(34, 4, 'Quels clubs et associations recommandez-vous à l\'ESP ?', 'Je viens de m\'inscrire à l\'ESP et j\'aimerais m\'impliquer dans la vie étudiante. Quels clubs et associations recommandez-vous ?', '2024-07-16 18:11:44', '2024-07-16 18:11:44'),
(35, 4, 'Quelles sont les meilleures ressources pour les projets de fin d\'études ?', 'Je suis en dernière année et je commence à préparer mon projet de fin d\'études. Quelles ressources recommandez-vous pour trouver des idées et des matériaux ?', '2024-07-16 18:12:02', '2024-07-16 18:12:02');

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `theme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `themes`
--

INSERT INTO `themes` (`id`, `user_id`, `theme`) VALUES
(3, 2, 'math'),
(4, 2, 'science'),
(5, 3, 'math'),
(6, 4, 'math'),
(7, 4, 'science'),
(8, 4, 'history');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(2, 'ndeindesow@hotmail.fr', '$2b$10$j2fVM1XupQBZE1I6g1j.COEVODJMvM7xR5jM./wNaLa0DoTtB6fKK', '2024-06-09 20:17:18'),
(3, 'test@test.fr', '$2b$10$HdyYFO8p0sGk.q/2AwM59eBz5FqPzU0U8R21p8P/rNFeCxesn3ima', '2024-06-09 20:32:22'),
(4, 'ibrahimandendesow@esp.sn', '$2b$10$r9NHdcOtrvWuQIIfE8/QV.AccIDQKFzhaFLRUVTPBDmi79bJrNfbm', '2024-07-16 17:58:35');

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

CREATE TABLE `votes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `question_id` int DEFAULT NULL,
  `answer_id` int DEFAULT NULL,
  `vote_type` enum('upvote','downvote') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_vote` (`user_id`,`question_id`,`answer_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `themes`
--
ALTER TABLE `themes`
  ADD CONSTRAINT `themes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `votes_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
