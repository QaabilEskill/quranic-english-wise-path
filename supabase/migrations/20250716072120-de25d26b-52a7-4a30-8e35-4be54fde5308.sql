-- Add some basic lessons in simple English
INSERT INTO lessons (title, description, content, level, category, is_islamic_themed) VALUES
('Greetings in Islam', 'Learn how to greet people in Islam using English', 'We say "Assalamu Alaikum" which means "Peace be upon you" in English. When someone says this to you, you say "Wa Alaikum Assalam" which means "And peace be upon you too". These are very nice words that show we care about each other.', 1, 'basics', true),
('Prayer Words', 'Basic words we use when we pray', 'When we pray, we use many Arabic words. "Allah" means God. "Subhanallah" means "Glory to Allah". "Alhamdulillah" means "Praise be to Allah". "Allahu Akbar" means "Allah is the Greatest". These are beautiful words that help us remember Allah.', 1, 'prayer', true),
('Family Words', 'Learn about family in Islam', 'Family is very important in Islam. Your mother is called "Ummi" and your father is "Abi". We must be kind to our parents. The Quran says we should be good to our mother and father. Family means people who love you and take care of you.', 1, 'family', true),
('Good Manners', 'How to be polite and kind', 'Islam teaches us to be kind and polite. We say "Please" when we ask for something. We say "Thank you" when someone helps us. We say "Sorry" when we make a mistake. Good manners make people happy and Allah loves people with good manners.', 1, 'manners', true),
('Helping Others', 'Why we should help people', 'Prophet Muhammad (peace be upon him) always helped people. When we help others, Allah is happy with us. We can help by sharing food, being kind with words, or helping someone who needs something. Helping others makes the world a better place.', 2, 'character', true);

-- Add some Islamic stories in simple English
INSERT INTO islamic_stories (title, content, level, moral_lesson, vocabulary_focus) VALUES
('The Kind Neighbor', 'Once there was a man who was not Muslim. He lived next to a Muslim family. Every day, the Muslim family was very kind to him. They shared food with him. They helped him when he was sick. They always smiled and said nice words. After some time, the man became Muslim because he saw how good and kind Muslims are. This story shows us that being kind to others is very important in Islam.', 'Beginner', 'Being kind to neighbors, no matter their religion, shows the beauty of Islam', ARRAY['neighbor', 'kind', 'family', 'food', 'help', 'sick', 'smile', 'good']),
('The Truthful Boy', 'There was a young boy named Ahmed. One day, his mother gave him money to buy bread. On the way, Ahmed found a toy he really wanted. The toy cost the same as the bread money. Ahmed thought about buying the toy and telling his mother he lost the money. But Ahmed remembered that Prophet Muhammad (peace be upon him) always told the truth. So Ahmed bought the bread and told his mother about the toy. His mother was so happy that Ahmed was honest that she gave him extra money to buy the toy later.', 'Beginner', 'Always tell the truth, even when it is hard', ARRAY['boy', 'mother', 'money', 'bread', 'toy', 'truth', 'honest', 'happy']),
('The Sharing Bird', 'There was a little bird who found a big piece of bread. The bird was very hungry. But when the bird looked around, it saw other birds who were also hungry. The kind bird broke the bread into small pieces and shared it with all the other birds. That night, Allah sent more food to the kind bird. This shows us that when we share with others, Allah gives us more.', 'Beginner', 'When we share what we have, Allah blesses us with more', ARRAY['bird', 'bread', 'hungry', 'share', 'pieces', 'night', 'food', 'bless']),
('The Patient Mother', 'Fatima was a mother with three children. Her children sometimes made noise and mess. But Fatima never got angry. She always spoke with a soft voice. She taught her children with love and patience. When her children grew up, they became very good people. They always remembered how patient and loving their mother was. This story teaches us that patience is very important, especially with family.', 'Intermediate', 'Patience and kindness with family creates good character', ARRAY['mother', 'children', 'noise', 'mess', 'angry', 'soft', 'voice', 'patience', 'love']);

-- Add some basic duas
INSERT INTO duas (arabic_text, english_translation, transliteration, category, occasion) VALUES
('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'In the name of Allah, the Most Gracious, the Most Merciful', 'Bismillah ir-Rahman ir-Raheem', 'daily', 'Before starting anything'),
('الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'All praise is due to Allah, Lord of all the worlds', 'Alhamdulillahi Rabbil Alameen', 'daily', 'Expressing gratitude'),
('رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً', 'Our Lord, give us good in this world and good in the next world', 'Rabbana atina fi dunya hasanatan wa fil akhirati hasanatan', 'general', 'General supplication'),
('اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا', 'O Allah, bless for us what You have provided us', 'Allahumma barik lana fima razaqtana', 'food', 'Before eating');

-- Add some Quranic words
INSERT INTO quranic_words (arabic_word, english_meaning, transliteration, context) VALUES
('الله', 'Allah (God)', 'Allah', 'The name of God in Arabic, used throughout the Quran'),
('رحمن', 'Most Gracious', 'Rahman', 'One of the beautiful names of Allah, meaning Most Gracious'),
('رحيم', 'Most Merciful', 'Raheem', 'One of the beautiful names of Allah, meaning Most Merciful'),
('صلاة', 'Prayer', 'Salah', 'The Islamic prayer performed five times a day'),
('قرآن', 'Quran', 'Quran', 'The holy book of Islam revealed to Prophet Muhammad'),
('إسلام', 'Islam', 'Islam', 'The religion of submission to Allah'),
('مسلم', 'Muslim', 'Muslim', 'One who submits to Allah and follows Islam'),
('سلام', 'Peace', 'Salam', 'Peace, also used in greetings Assalamu Alaikum');