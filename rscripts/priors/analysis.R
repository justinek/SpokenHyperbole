library(ggplot2)
library(plyr)
library(reshape2)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")

p <- read.csv("../../data/priors/long.csv")
p$item <- factor(p$item, levels=c("perfume", "necklace", "china_set", "chain_saw", "dumbbell_rack", "lawn_mower"))
colors.gender <- c("#ff6666", "#023858", "#99cc99")

############
# Demographics
############
p.demo <- unique(p[1:5])

nrow(subset(p.demo, gender=="M"))
nrow(subset(p.demo, gender=="F"))
mean(p.demo$age)

ggplot(p.demo, aes(x=age)) +
  geom_histogram(stat="bin", binwidth=10) +
  theme_bw() +
  facet_grid(.~gender)

ggplot(p.demo, aes(x=income)) +
  geom_histogram(stat="bin", binwidth=1) +
  theme_bw() +
  facet_grid(.~gender)

###########
# Distributions
###########
# aggregate
ggplot(p, aes(x=price)) +
  geom_histogram(binwidth=10) +
  facet_wrap(~item, ncol=3, scales="free_x") +
  theme_bw()

# by buyer gender
ggplot(p, aes(x=price, color=buyerType, fill=buyerType, group=buyerType)) +
  #geom_histogram(aes(y = ..density..), stat="bin", binwidth=50, position="dodge", alpha=0.2) +
  geom_density(alpha=0.2) +
  facet_wrap(~item, ncol=3, scales="free_x") +
  theme_bw() +
  scale_color_manual(values=colors.gender, name="Buyer gender") +
  scale_fill_manual(values=colors.gender, name="Buyer gender")

ggplot(p, aes(x=buyerType, y=price, fill=buyerType)) + 
  geom_boxplot(alpha=0.8) +
  facet_wrap(~item, ncol=3, scales="free") +
  theme_bw() +
  scale_color_manual(values=colors.gender) +
  scale_fill_manual(values=colors.gender)


# by subject gender
ggplot(p, aes(x=price, color=gender)) +
  geom_density() +
  #geom_histogram(stat="bin", binwidth=50, position="dodge") +
  facet_wrap(~item, ncol=3, scales="free_x") +
  theme_bw() +
  scale_color_manual(values=colors.gender, name="Subject gender")

ggplot(p, aes(x=gender, y=price, fill=gender)) + 
  geom_boxplot(alpha=0.8) +
  facet_wrap(~item, ncol=3, scales="free") +
  theme_bw() +
  scale_color_manual(values=colors.gender) +
  scale_fill_manual(values=colors.gender)

# by buyer gender and subject gender
ggplot(p, aes(x=price, color=buyerType, fill=buyerType)) +
  geom_density(alpha=0.2) +
  #geom_histogram(stat="bin", binwidth=50, position="dodge") +
  facet_grid(gender~item, scales="free_x") +
  theme_bw() +
  scale_color_manual(values=colors.gender, name="Buyer gender") +
  scale_fill_manual(values=colors.gender, name="Buyer gender")

ggplot(p, aes(x=buyerType, y=price, fill=buyerType)) + 
  geom_boxplot(alpha=0.8) +
  facet_grid(item~gender, scales="free") +
  theme_bw() +
  scale_color_manual(values=colors.gender) +
  scale_fill_manual(values=colors.gender)

########
# Means
########
p.buyerGender <- summarySE(p, measurevar="price", groupvar=c("item", "buyerType"))
ggplot(p.buyerGender, aes(x=item, y=price, fill=buyerType)) +
  geom_bar(stat="identity", position="dodge", color="black") +
  geom_errorbar(aes(ymin=price-ci, ymax=price+ci), position=position_dodge(0.9), width=0.5) +
  theme_bw() +
  scale_fill_manual(values=colors.gender)

p.sGender <- summarySE(p, measurevar="price", groupvar=c("item", "gender"))
ggplot(p.sGender, aes(x=item, y=price, fill=gender)) +
  geom_bar(stat="identity", position="dodge", color="black") +
  geom_errorbar(aes(ymin=price-ci, ymax=price+ci), position=position_dodge(0.9), width=0.5) +
  theme_bw() +
  scale_fill_manual(values=colors.gender)

p.buyerGender.sGender <- summarySE(p, measurevar="price", groupvar=c("item", "buyerType", "gender"))
ggplot(p.buyerGender.sGender, aes(x=gender, y=price, fill=buyerType)) +
  geom_bar(stat="identity", position="dodge", color="black") +
  geom_errorbar(aes(ymin=price-ci, ymax=price+ci), position=position_dodge(0.9), width=0.5) +
  theme_bw() +
  facet_wrap(~item, ncol=3) +
  scale_fill_manual(values=colors.gender, name="Buyer type")

#####################
# Stats 
#####################

summary(lm(data=p, price ~ gender * buyerType * itemType))
