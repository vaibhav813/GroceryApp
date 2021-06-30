
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';

const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const ShopInfo=()=>{
    const renderItem = useCallback(({ item }) => {
        return (
          <View style={style.item}>
            <Image source={img1} resizeMode="contain" style={style.image} />
            <Text style={style.text}>{item}</Text>
          </View>
        );
      }, []);
      const renderSectionHeader = useCallback(({ section }) => {
        return (
          <View style={style.section}>
            <Text>{section.title}</Text>
          </View>
        );
      }, []);
    return (
        <AnimatedScreen.Wrapper disableParallaxEffect>
          <AnimatedScreen.Header backgroundColor="#f1f1f1" withShadow>
            <View style={style.container}>
              <Text style={style.title}>Example 3</Text>
              <AnimatedScreen.CollapsibleElement>
                <Text style={style.subtitle}>Simple header with SectionList</Text>
              </AnimatedScreen.CollapsibleElement>
            </View>
          </AnimatedScreen.Header>
          <AnimatedScreen.SectionList
            sections={sections.map(section => ({
              title: section,
              data: new Array(Math.floor(Math.random() * 5) + 1).fill(
                `Element in ${section} section`,
              ),
            }))}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </AnimatedScreen.Wrapper>
      );
}